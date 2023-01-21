from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm

from petparent.models import User, PetCareAdvert, PetAdoptionAdvert


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User

        fields = ['username', 'email', 'password1', 'password2', 'role']


class CreatePeCareAdvertForm(ModelForm):
    class Meta:
        model = PetCareAdvert

        fields = ['title', 'offer_description', 'date_from', 'date_to', 'contact_info', 'location']


class CreateShelterAdvertForm(ModelForm):
    class Meta:
        model = PetAdoptionAdvert

        fields = ['title', 'offer_description', 'animal_description', 'contact_info', 'location', 'photo']
