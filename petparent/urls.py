"""petparent URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from petparent import views


urlpatterns = [
    path('healthcheck/', views.healthcheck),

    path('', views.home, name='home'),
    path('login/', views.loginPage, name='login'),
    path('register/', views.registerPage, name='register'),
    path('logout/', views.logoutUser, name='logout'),
    path('lostpassword/', views.lostPasswordPage, name='lostpassword'),
    path('petcare/', views.PetCareAdsView.as_view(), name='petcare-ads'),
    path('adoption/', views.ShelterAdsView.as_view(), name='adoption-ads'),
    path('my_posts/', views.OwnAdoptionPostsList.as_view(), name='own-adoption-posts'),
    path('my_posts/', views.OwnPetCarePostsList.as_view(), name='own-petcare-posts'),
    path('petcare/<int:pk>', views.PetCareAdDetailView.as_view(), name='petcare-detail'),
    path('adoption/<int:pk>', views.ShelterAdDetailView.as_view(), name='adoption-detail'),
    path('publish_adopt_ad/', views.AdoptionAdCreate.as_view(), name='publish-adoption-ad'),
    path('publish_pc_ad/', views.PetCareAdCreate.as_view(), name='publish-petcare-ad'),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
