from django.db.models.query import RawQuerySet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import datetime
from datetime import timezone
from .models import EmailOtp
from django.contrib.auth.models import User
import random
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from django.core.mail import send_mail
import json

class ObtainOtpView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        otp = random.randint(999,9999)

        if EmailOtp.objects.filter(username=request.user.username).exists():
            otp_object = EmailOtp.objects.filter(username = request.user.username).first()
            otp_object.otp = otp
            otp_object.count += 1
            otp_object.save()
        else:
            otp_object = EmailOtp(username=request.user.username,otp=otp,count=1)
            otp_object.save()
        user = User.objects.filter(username=request.user.username).first()
        send_mail(
            'Your Otp to Securely Login',
            f'Otp: {otp}',
            'dummy9585@gmail.com',
            [user.email],
            fail_silently=False,
        )

        return Response({"message":'Otp Generated Successfully'})

class VerifyOtpView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
   
        otp = json.loads(request.body.decode('utf-8')).get('otp','')


        if otp:
            otp_object = EmailOtp.objects.filter(username=request.user.username).first()
            delta =  datetime.datetime.now(timezone.utc) - otp_object.updated_date

            if delta.seconds > 300:
                return Response({'message':'Otp expired'}, status=412)
            else:
                if otp == otp_object.otp:
                    return Response({'message':'Otp verified successfully'})
                return Response({'message':"Otp doesn't match"}, status=412)
        else:
            return Response({'message':'No Otp sent'}, status=412)


class CurrentUserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)