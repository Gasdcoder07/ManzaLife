from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CategoryViewSet, RegisterView, PerfilView, CommentViewSet, ReviewViewSet, UpdatePasswordView, UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet)
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'reviews', ReviewViewSet)
router.register(r'usuarios', UserViewSet, basename='usuario')

urlpatterns = [
    path('usuarios/update-password/', UpdatePasswordView.as_view(), name='actualizar_password'),
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
