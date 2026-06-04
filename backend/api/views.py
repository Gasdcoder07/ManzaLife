from django.utils import timezone

from rest_framework import viewsets, generics, status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from .models import Post, Category, User, Comment, Review, SystemRequest, UserProfile, EmailVerification
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from .permissions import IsAuthorOrReadOnly, IsAdminRole, IsNotBanned
from .serializers import PostSerializer, PostListSerializer, CategorySerializer, CategoryDropdownSerializer, RegisterSerializer, UserSerializer, CommentSerializer, ReviewSerializer, SystemRequestSerializer

from datetime import date, timedelta

class BanUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def patch(self, request, id):
        profile = get_object_or_404(UserProfile, user__id=id)

        if profile.user == request.user:
            return Response(
                {
                    "error": "No puedes banear tu propia cuenta"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reason = request.data.get("reason", "No especificado")

        profile.is_banned =  True
        profile.ban_reason = reason
        profile.ban_date = timezone.now()
        profile.save()

        profile.user.is_active = not profile.is_banned
        profile.user.save()

        return Response({ "message": f"Usuario {'baneado' if profile.is_banned else 'desbaneado'} exitosamente" })

class UnbanUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def patch(self, request, id):
        profile = get_object_or_404(UserProfile, user__id=id)
            
        profile.is_banned = False
        profile.ban_reason = None
        profile.ban_date = None
        profile.save()

        profile.user.is_active = True
        profile.user.save()

        return Response({ "message": "Usuario desbaneado exitosamente" })

class MakeAdminView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def patch(self, request, id):
        profile = get_object_or_404(UserProfile, user__id=id)

        if profile.user == request.user:
            return Response(
                {"error": "No puedes modificar tu propio rol"},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.user_type = "admin"
        profile.user.is_staff = True

        profile.save()
        profile.user.save()

        return Response({ "message": "Usuario promovido a admin exitosamente" })
    
class RemoveAdminView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def patch(self, request, id):
        profile = get_object_or_404(UserProfile, user__id=id)

        if profile.user == request.user:
            return Response(
                {"error": "No puedes modificar tu propio rol"},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.user_type = "reader"
        profile.user.is_staff = False

        profile.save()
        profile.user.save()

        return Response({ "message": "Rol de admin removido exitosamente" })

class DashboardStatsView(APIView):
    def get(self, request):
        data = {
            "posts": Post.objects.count(),
            "categories": Category.objects.count(),
            "users": User.objects.count(),
            "requests": SystemRequest.objects.count(),
        }
        return Response(data)

class CustomPagination(PageNumberPagination):
    page_size = 8

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = CustomPagination

    def list(self, request, *args, **kwargs):
        if request.query_params.get('pagination') == 'false':
            self.pagination_class = None

        return super().list(request, *args, **kwargs)
    
    def get_serializer_class(self):
        if self.request.query_params.get('pagination') == 'false':
            return CategoryDropdownSerializer
        return CategorySerializer

class PostViewSet(viewsets.ModelViewSet):
    lookup_field = "slug"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly, IsNotBanned]

    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Post.objects.filter(status="published")

        author = self.request.query_params.get("author")
        category = self.request.query_params.get("category")

        if author:
            queryset = queryset.filter(author__username__iexact=author)

        if category:
            queryset = queryset.filter(category__slug__iexact=category)

        if self.action == 'retrieve':
            return queryset.prefetch_related(
                'comments',
                'comments__author',
                'comments__author__userprofile'
            )
        return queryset.select_related("author", "author__userprofile", "category").order_by("-created_at")

    def get_serializer_class(self):
        if self.action == "list":
            return PostListSerializer
        return PostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # queryset = Post.objects.all()
    # serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly, IsNotBanned]

    def get_queryset(self):
        if self.action == 'list':
            return Comment.objects.filter(parent__isnull=True).prefetch_related('replies')
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly, IsNotBanned]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        profile = user.userprofile

        user.first_name = request.data.get("first_name", user.first_name)
        user.last_name = request.data.get("last_name", user.last_name)
        user.username = request.data.get("username", user.username)
        profile.bio = request.data.get("bio", profile.bio)

        if 'avatar' in request.FILES:
            profile.avatar = request.FILES['avatar']
        
        if 'banner' in request.FILES:
            profile.banner = request.FILES['banner']

        user.save()
        profile.save()

        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'username'
    lookup_value_regex = '[^/]+'
    pagination_class = CustomPagination
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return User.objects.exclude(id=self.request.user.id).order_by('-date_joined')
        return User.objects.all().order_by('-date_joined')

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def perform_create(self, serializer):
        user = serializer.save()

        verification = EmailVerification(user=user)
        verification.generate_code()
        
        asunto = 'Verificación tu cuenta de Manzalife'
        mensaje = f'Hola {user.username},\n\nGracias por registrarte en Manzalife. Tu código de verificación es: {verification.code}\n\n¡Bienvenido a la comunidad!'

        send_mail(
            asunto,
            mensaje,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

class UpdatePasswordView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request):
        email = request.data.get('email')
        nueva_password = request.data.get("nueva_password")

        if not email or not nueva_password:
            return Response(
                    {"error": "Faltan datos de email o contraseña"},
                    status=status.HTTP_400_BAD_REQUEST
                    )
        try:
            usuario = User.objects.get(email=email)

            usuario.set_password(nueva_password)
            usuario.save()

            return Response(
                    {"mensaje": "¡Contraseña sincronizada con éxito en Django!"},
                    status=status.HTTP_200_OK
                )

        except User.DoesNotExist:
            return Response(
                    {"error": "Usuario no encontrado en la base de datos"},
                    status=status.HTTP_400_BAD_REQUEST
                    )

class SystemRequestViewSet(viewsets.ModelViewSet):
    serializer_class = SystemRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = SystemRequest.objects.filter(user=self.request.user)
        status_param = self.request.query_params.get('status')
        type_param = self.request.query_params.get('type')

        if status_param:
            queryset = queryset.filter(status=status_param)
        if type_param:
            queryset = queryset.filter(request_type=type_param)

        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def all_requests(self, request):
        if not request.user.is_staff:
            raise PermissionDenied("No tienes permiso para ver esto.")
        queryset = SystemRequest.objects.all()
        status_param = request.query_params.get('status')
        type_param = request.query_params.get('type')

        if status_param:
            queryset = queryset.filter(status=status_param)
        if type_param:
            queryset = queryset.filter(request_type=type_param)

        queryset = queryset.order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='approve')
    def approve(self, request, pk=None):
        if not request.user.is_staff:
            raise PermissionDenied("No tienes permiso para aprobar esta acción.")

        try: 
            solicitud = SystemRequest.objects.get(pk=pk)
        except SystemRequest.DoesNotExist:
            return Response({"detail": "Solicitud no encontrada"}, status=404)

        solicitud.status = 'approved'
        solicitud.save()

        return Response(self.get_serializer(solicitud).data, status=200)

    @action(detail=True, methods=['patch'], url_path='reject')
    def reject(self, request, pk=None): 
        if not request.user.is_staff:
            raise PermissionDenied("No tienes permiso para rechazar esta acción.")

        try:
            solicitud = SystemRequest.objects.get(pk=pk)
        except SystemRequest.DoesNotExist:
            return Response({"detail": "Solicitud no encontrada"}, status=404)

        solicitud.status = "rejected"
        solicitud.save()

        return Response(self.get_serializer(solicitud).data, status=200)
    
class ManzaDleResultadoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        resultado = request.data.get("status")
        today = date.today()
        profile = user.userprofile

        if profile.manzadle_last_played == today:
            return Response({"detail": "Ya registraste tu partida hoy."}, status=400)
        
        profile.manzadle_last_result = resultado
        
        if resultado == "win":
            yesterday = today - timedelta(days=1)
            if profile.manzadle_last_played == yesterday:
                profile.manzadle_streak += 1
            else:
                profile.manzadle_streak = 1
            profile.manzadle_max_streak = max(profile.manzadle_streak, profile.manzadle_max_streak)
        else:
            profile.manzadle_streak = 0

        profile.manzadle_last_played = today
        profile.save(update_fields=["manzadle_streak", "manzadle_last_played", "manzadle_max_streak", "manzadle_last_result"])

        return Response ({
            "streak": profile.manzadle_streak,
            "max_streak": profile.manzadle_max_streak
        })
    
    def get(self, request):
        profile = request.user.userprofile
        return Response({
            "last_played": profile.manzadle_last_played,
            "last_result": profile.manzadle_last_result,
            "streak": profile.manzadle_streak,
            "max_streak": profile.manzadle_max_streak,
            "played_today": profile.manzadle_last_played == date.today()
        })

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')
        
        if not email or not code:
            return Response({"error": "Faltan datos de email o código"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            verification = EmailVerification.objects.get(user=user)
            
            if verification.code == code:
                user.userprofile.is_email_verified = True
                user.userprofile.save()
                verification.delete()
                return Response({"message": "Correo verificado exitosamente"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Código de verificación incorrecto"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
        except EmailVerification.DoesNotExist:
            return Response({"error": "No se encontró una verificación para este usuario"}, status=status.HTTP_400_BAD_REQUEST)