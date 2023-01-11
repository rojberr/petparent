from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import datetime


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, role):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email)
        )

        user.username = username
        user.role = role
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email)
        )
        user.username = username
        user.role = 'ADMIN'
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    class Role(models.TextChoices):
        PET_OWNER = "PET_OWNER", 'Pet-owner',
        PET_SITTER = "PET_SITTER", 'Pet-sitter',
        PET_HOSTEL = "PET_HOSTEL", 'Pet-hostel',
        ANIMAL_SHELTER = "ANIMAL_SHELTER", 'Pet-shelter',
        FOSTER_PARENT = "FOSTER_PARENT", 'Pet-parent',

    objects = CustomUserManager()
    role = models.CharField(max_length=50, choices=Role.choices, default=None)


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False, blank=False)
    date_posted = models.DateTimeField(default=timezone.now)
    offer_description = models.TextField(null=False, blank=False)

    def __str__(self):
        return f'{self.title} author: {self.author.username}'

    class Meta:
        ordering = ['-date_posted']


class PetForAdoptionOffer(Post):  # animal shelter
    animal_description = models.TextField(null=False, blank=False)


class RequestForPetSitter(Post):  # pet owner
    date_from = models.DateField(default=timezone.now()+datetime.timedelta(days=2))
    date_to = models.DateField(default=timezone.now()+datetime.timedelta(days=5))
    animal_description = models.TextField(null=False, blank=False)


class HotelOffer(Post):
    date_from = models.DateField(default=timezone.now)
    date_to = models.DateField(default=timezone.now()+datetime.timedelta(days=5))
