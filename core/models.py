from django.db import models

# Create your models here.
import uuid

from django.db import models
from django.urls.base import reverse
from cloudinary_storage.storage import RawMediaCloudinaryStorage


class Record(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voice_record = models.FileField(upload_to="records", storage=RawMediaCloudinaryStorage())
    text_record = models.CharField(max_length=1000,null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)
    native_language = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    age = models.CharField(max_length=50, null=True, blank=True)
    proficiency = models.CharField(max_length=50, null=True, blank=True)
    sentenceNumber = models.CharField(max_length=10, null=True, blank=True)
     
    class Meta:
        verbose_name = "Record"
        verbose_name_plural = "Records"

    def __str__(self):
        return str(self.id) 

    def get_absolute_url(self):
        return reverse("core:record_detail", kwargs={"id": str(self.id)})
