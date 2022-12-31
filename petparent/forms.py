from django.contrib.auth.forms import UserCreationForm

from petparent.models import User


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User

        fields = ['username', 'email', 'password1', 'password2', 'role']
