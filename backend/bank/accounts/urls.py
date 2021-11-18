from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainOtpView, VerifyOtpView, CurrentUserView
urlpatterns = [
    # Your URLs...
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/otp/generate/', ObtainOtpView.as_view(), name='otp_gen'),
    path('api/otp/verify/', VerifyOtpView.as_view(), name='otp_verify'),
    path('api/user/',CurrentUserView.as_view(), name='current_user')
]