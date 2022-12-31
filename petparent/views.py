from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import render

from petparent.forms import CreateUserForm


def healthcheck(request):
    return HttpResponse(status=200)


def home(request):
    return render(request, 'home.html')


def loginPage(request):
    return render(request, 'login.html')


def registerPage(request):
    registrationForm = CreateUserForm()
    context = {'form': registrationForm}
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
