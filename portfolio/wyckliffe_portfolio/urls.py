
from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('', views.index, name="index"),
    path('admin/', admin.site.urls),
    path('projects/', include('projects.urls')),
    path('blog/', include("blog.urls")),
]

