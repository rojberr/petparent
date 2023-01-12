from django.contrib import admin

from .models import User, PetAdoptionAdvert, PetCareAdvert

admin.site.register(User)
admin.site.register(PetAdoptionAdvert)
admin.site.register(PetCareAdvert)
