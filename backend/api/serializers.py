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
    bio = serializers.CharField(source='userprofile.bio', read_only=True)
    avatar = serializers.ImageField(source='userprofile.avatar', read_only=True)
    # profile = UserProfileSerializer(source='userprofile', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 'avatar']

class CommentReplySerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source="author.username")
    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'author_avatar', 'content', 'created_at']

    def get_author_avatar(self, obj):
        try:
            if hasattr(obj.author, 'userprofile') and obj.author.userprofile.avatar:
                return obj.author.userprofile.avatar.url
        except:
            pass
        return None
          
class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source="author.username")
    author_avatar = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'author_name', 'author_name',
            'author_avatar', 'content', 'created_at',
            'parent', 'replies'
        ]
    
    def get_author_avatar(self, obj):
        try:
            if hasattr(obj.author, 'userprofile') and obj.author.userprofile.avatar:
                return obj.author.userprofile.avatar.url
        except:
            pass
        return None

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentReplySerializer(obj.replies.all(), many=True).data
        return []
    
class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only = True)
    author = UserSerializer(read_only = True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content', 'image', 
            'latitude', 'longitude', 'created_at', 
            'category', 'category_id','author', 'comments', 'status'
        ]

class PostListSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source="category.name")
    author_name = serializers.ReadOnlyField(source="author.username")
    author_avatar = serializers.ImageField(source="author.userprofile.avatar", read_only=True)
    summary = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "title",
            "summary",
            "image",
            "created_at",
            "category_name",
            "author_name",
            "author_avatar",
            "status"
        ]

    def get_summary(self, obj):
        if obj.content and len(obj.content) > 120:
            return obj.content[:120] + "..."
        
        return obj.content

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
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'post', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']