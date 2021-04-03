
from django.http import HttpResponse

def index(request): 

    template = loader.get_template('templates/base.html')
    return HttpResponse(template.render(request))
