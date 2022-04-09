import json

from django.shortcuts import render
from .components.chatbot import chatbot_response
from django.http import HttpResponse


def main_view(request):

    if request.method == 'POST':

        response = {'status': None, 'message': None}
        user_response = json.loads(request.body)
        user_response = user_response['message']
        ai_response = chatbot_response(user_response)
        response['message'] = {'text': ai_response}
        return HttpResponse(json.dumps(response))

    else:
        return render(request, "bot-index.html")
