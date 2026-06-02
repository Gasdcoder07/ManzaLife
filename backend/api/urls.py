from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ManzaDleResultadoView, BanUserView, UnbanUserView, PostViewSet, CategoryViewSet, RegisterView, PerfilView, CommentViewSet, ReviewViewSet, UpdatePasswordView, UserViewSet, DashboardStatsView, SystemRequestViewSet, MakeAdminView, RemoveAdminView, VerifyEmailView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet)
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'reviews', ReviewViewSet)
router.register(r'usuarios', UserViewSet, basename='usuario')
router.register(r'requests', SystemRequestViewSet, basename='requests')

urlpatterns = [
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),

    path('usuarios/<int:id>/ban/', BanUserView.as_view(), name='user-ban'),
    path('usuarios/<int:id>/unban/', UnbanUserView.as_view(), name='user-unban'),

    path('usuarios/<int:id>/make-admin/', MakeAdminView.as_view(), name='user-make-admin'),
    path('usuarios/<int:id>/remove-admin/', RemoveAdminView.as_view(), name='user-remove-admin'),
    
    path('usuarios/update-password/', UpdatePasswordView.as_view(), name='actualizar_password'),
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('manzadle/resultado/', ManzaDleResultadoView.as_view(), name="Manzadle_view")
]
