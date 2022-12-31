from django.contrib import messages
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect

from petparent.forms import CreateUserForm
from petparent.models import User


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
                messages.info(request, 'Your logged in as ' + username)
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
    # This is a lost password view
    return render(request, 'lostpassword.html')


def searchPage(request):
    return render(request, 'search.html')


def publishPage(request):
    return render(request, 'publish.html')


def logoutUser(request):
    logout(request)
    return redirect('home')
