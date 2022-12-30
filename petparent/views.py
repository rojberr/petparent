from django.http import HttpResponse
from django.shortcuts import render


def healthcheck(request):
    return HttpResponse(status=200)


def home(request):
    return render(request, 'home.html')


def loginPage(request):
    return render(request, 'login.html')


def registerPage(request):
    context = {}
    return render(request, 'register.html', context)


def lostPasswordPage(request):
    # This is a lost password view
    # This is a lost password view
    return render(request, 'lostpassword.html')


def searchPage(request):
    return render(request, 'search.html')


def publishPage(request):
    return render(request, 'publish.html')
