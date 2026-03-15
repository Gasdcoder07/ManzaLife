from rest_framework import serializers
from .models import Post, Category, UserProfile, Comment, Review
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'is_local_business']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='userprofile', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
        
class PostSerializer(serializers.ModelSerializer):
    # -> Que añada categories y users dentro de posts
    category = CategorySerializer(read_only = True)
    author = UserSerializer(read_only = True)

    class Meta:
        model = Post
        fields = "__all__"

class PostListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name")
    author_name = serializers.CharField(source="author.username")
    author_avatar = serializers.ImageField(source="author.userprofile.avatar", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "title",
            "content",
            "image",
            "created_at",
            "category_name",
            "author_name",
            "author_avatar"
        ]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data
    
    def create(self, validated_data):   
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user
    


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author_name', 'content', 'created_at']
        read_only_fields = ['author']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'post', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']