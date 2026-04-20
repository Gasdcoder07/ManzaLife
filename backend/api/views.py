from rest_framework import viewsets, generics, status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Category, User, Comment, Review
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, PostListSerializer, CategorySerializer, RegisterSerializer, UserSerializer, CommentSerializer, ReviewSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class PostViewSet(viewsets.ModelViewSet):
    lookup_field = "slug"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        queryset = Post.objects.filter(status="published")

        author = self.request.query_params.get("author")

        if author:
            queryset = queryset.filter(author__username__iexact=author)

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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        if self.action == 'list':
            return Comment.objects.filter(parent__isnull=True).prefetch_related('replies')
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

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
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'username'

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

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
