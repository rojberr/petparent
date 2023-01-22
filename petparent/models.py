from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from datetime import timedelta, date


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
    title = models.CharField(max_length=100, null=False, blank=False, help_text="Tytuł ogłoszenia")
    date_posted = models.DateTimeField(default=timezone.now)
    offer_description = models.TextField(null=False, blank=False, help_text="Cel ogłoszenia")
    contact_info = models.CharField(max_length=100, null=False, blank=False, help_text="+48-600-500-400")
    location = models.CharField(max_length=100, null=True, blank=True, help_text="ul.Kazimierza Wielkiego 21, Warszawa")

    def __str__(self):
        return f'Title: {self.title}, author: {self.author.username}'

    class Meta:
        ordering = ['-date_posted']
        abstract = True


class PetAdoptionAdvert(Post):  # animal shelter
    animal_description = models.TextField(null=False, blank=False, help_text="Rasa, wiek, charakter, szczególne "
                                                                             "potrzeby, ulubiony sposób spędzania czasu")
    photo = models.ImageField(default='hamster.jpeg', blank=True, upload_to='pet_photos/')

    class Meta(Post.Meta):
        db_table = 'pet_adoption_advert'


class PetCareAdvert(Post):  # pet owner + pet hostel
    date_from = models.DateField(default=date.today()+timedelta(days=2), help_text="04.10.2023")
    date_to = models.DateField(default=date.today()+timedelta(days=5), help_text="08.10.2023")

    class Meta(Post.Meta):
        db_table = 'pet_care_advert'
