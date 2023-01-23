from django.contrib import messages
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView
from django.views.generic import CreateView, UpdateView, DeleteView

from petparent.forms import CreateUserForm, CreateShelterAdvertForm
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
    form_class = CreateShelterAdvertForm
    template_name = 'publish_adoption.html'
    success_url = reverse_lazy('adoption-ads')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)



class AdoptionAdUpdate(UpdateView):
    model = PetAdoptionAdvert
    fields = ['title', 'offer_description', 'animal_description', 'photo', 'contact_info', 'location']


class AdoptionAdDelete(DeleteView):
    model = PetCareAdvert
    success_url = reverse_lazy('adoption-ads')


class PetCareAdCreate(CreateView):
    model = PetCareAdvert
    fields = ['title', 'offer_description', 'date_from', 'date_to', 'contact_info', 'location']
    template_name = 'publish_petcare.html'
    # success_url = 'petcare-ads'

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        form = self.form_valid(form)
        if form.is_valid():
            return redirect('petcare-ads')
        else:
            return self.form_invalid(form)


class OwnAdoptionPostsList(ListView):
    model = PetAdoptionAdvert
    context_object_name = 'adverts'
    template_name = 'adoption_ads.html'

    def get_queryset(self):
        user = self.request.user
        return self.model.objects.filter(author=user)


class OwnPetCarePostsList(ListView):
    model = PetCareAdvert
    context_object_name = 'adverts'
    template_name = 'petcare_ads.html'

    def get_queryset(self):
        user = self.request.user
        return self.model.objects.filter(author=user)


@login_required()
def publishPage(request):
    form = None
    context = {'form': form}
    return render(request, 'petcare_ads.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')
