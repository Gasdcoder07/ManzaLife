from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.author == request.user
    
class IsAdminRole(permissions.BasePermission):
    message = "Acceso denegado, solo administradores peuden accdeder"

    def hasPermission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return hasattr(request.user, 'userprofile') and request.user.userprofile.user_type == 'admin'
    
class IsNotBanned(permissions.BasePermission):
    message = "Tu cuenta ha sido suspendida"

    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated and hasattr(request.user, 'userprofile'):
            return not request.user.userprofile.is_banned
        return True 
