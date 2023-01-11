from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm

from petparent.models import User, RequestForPetSitter, HotelOffer, PetForAdoptionOffer


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User

        fields = ['username', 'email', 'password1', 'password2', 'role']


class CreateOwnerAdvertForm(ModelForm):
    class Meta:
        model = RequestForPetSitter

        fields = ['title', 'offer_description', 'date_from', 'date_to', 'animal_description']


class CreateHotelAdvertForm(ModelForm):
    class Meta:
        model = HotelOffer

        fields = ['title', 'offer_description', 'date_from', 'date_to']


class CreateShelterAdvertForm(ModelForm):
    class Meta:
        model = PetForAdoptionOffer

        fields = ['title', 'offer_description', 'animal_description']
