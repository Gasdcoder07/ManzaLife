from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
import random

# Nuestros modelos irán a partir de aquí:

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, default="beach") # -> React Icon
    image = models.ImageField(upload_to="categories/", null=True, blank=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    USER_TYPES = [
        ("admin", "Admin"),
        ("writter", "Escritor"),
        ("reader", "Lector")
    ]

    MANZADLE_STATES = [
        ("win", "Win"),
        ("loss", "Loss")
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    banner = models.ImageField(upload_to="banners/", null=True, blank=True)
    is_local_business = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    ban_reason = models.TextField(blank=True, null=True)
    ban_date = models.DateTimeField(blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPES,
        default="reader"
    )
    manzadle_streak = models.IntegerField(default=0)
    manzadle_last_played = models.DateField(null=True, blank=True)
    manzadle_max_streak = models.IntegerField(default=0)
    manzadle_last_result = models.CharField(max_length=20, choices=MANZADLE_STATES)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    image = models.ImageField(upload_to="posts/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    STATUS_CHOICES = (
        ('draft', 'Borrador'),
        ('published', 'Publicado'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    def save(self, *args, **kwargs):
        if not self.slug:
            words = self.title.split()[:8]
            short_title = " ".join(words)

            base_slug = slugify(short_title)
            slug = base_slug
            counter = 1

            while Post.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug

        super().save(*args, **kwargs)


    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    def __str__(self):
        return f"Comentario de {self.author.username}"
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')

class SystemRequest(models.Model):
    TYPE_CHOICES = [
        ('admin_role', 'Solicitud de Admin'),
        ('new_category', 'Nueva categoría'),
        ('ban_user', 'Banear usuario'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('approved', 'Aprobada'),
        ('rejected', 'Rechazada'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    request_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.request_type} ({self.status})"

class EmailVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def generate_code(self):
        self.code = str(random.randint(100000, 999999))
        self.save()