from django.contrib import messages
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView
from django.views.generic import CreateView, UpdateView, DeleteView

from petparent.forms import CreateUserForm
from petparent.models import User, PetCareAdvert, PetAdoptionAdvert


def healthcheck(request):
    return HttpResponse(status=200)


def home(request):
    context = {}
    return render(request, 'home.html', context)


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, "You're logged in as " + username)
                return redirect('home')
            else:
                messages.info(request, 'Username OR password is incorrect')
        context = {}
        return render(request, 'login.html', context)


def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        registrationForm = CreateUserForm()
        if request.method == 'POST':
            registrationForm = CreateUserForm(request.POST)
            if registrationForm.is_valid():
                role = registrationForm.cleaned_data['role']
                username = registrationForm.cleaned_data['username']
                email = registrationForm.cleaned_data['email']
                password = registrationForm.cleaned_data['password1']
                user = User.objects.create_user(username, email, password, role)
                user.save()
                messages.success(request, 'Account was created for ' + username)
                return redirect('login')
        trainers = User.objects.filter(role="TRAINER")
        context = {'form': registrationForm, 'trainers': trainers}
        return render(request, 'register.html', context)


def lostPasswordPage(request):
    # This is a lost password view
    return render(request, 'lostpassword.html')


class PetCareAdsView(ListView):
    model = PetCareAdvert
    context_object_name = 'adverts'
    template_name = 'petcare_ads.html'


class ShelterAdsView(ListView):
    model = PetAdoptionAdvert
    context_object_name = 'adverts'
    template_name = 'adoption_ads.html'


class PetCareAdDetailView(DetailView):
    model = PetCareAdvert
    context_object_name = 'advert'
    template_name = 'petcare_detail.html'


class ShelterAdDetailView(DetailView):
    model = PetAdoptionAdvert
    context_object_name = 'advert'
    template_name = 'adoption_detail.html'


class AdoptionAdCreate(CreateView):
    model = PetAdoptionAdvert
    fields = ['title', 'offer_description', 'animal_description', 'photo', 'contact_info', 'location']
    template_name = 'create_ad.html'


class AdoptionAdUpdate(UpdateView):
    model = PetAdoptionAdvert
    fields = ['title', 'offer_description', 'animal_description', 'photo', 'contact_info', 'location']


class AdoptionAdDelete(DeleteView):
    model = PetCareAdvert
    success_url = reverse_lazy('adoption-ads')


@login_required()
def publishPage(request):
    form = None
    context = {'form': form}
    return render(request, 'petcare_ads.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')
