from django.db import models

# Create your models here.
class EmailOtp(models.Model):
    username = models.CharField(max_length=254, unique=True, blank=True, default=False)
    otp = models.CharField(max_length=9, blank=True, null=True)
    count = models.IntegerField(default=0, help_text = 'Number of opt_sent')
    updated_date = models.DateTimeField('date_published', auto_now=True)
    def __str__(self):
         return str(self.phone) + ' is sent ' + str(self.otp)