from django.contrib import admin

from core.models import Record


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "gender","native_language","state","age","proficiency","voice_record","sentenceNumber")
