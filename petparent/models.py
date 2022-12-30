from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


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
