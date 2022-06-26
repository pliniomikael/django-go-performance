from django.contrib import admin
from pokemon.models import Pokemon, Ability, Type
# Register your models here.

class PokemonAdmin(admin.ModelAdmin):
  search_fields = ['name']

class AbilityAdmin(admin.ModelAdmin):
  search_fields = ['pokemon__name']

class TypeAdmin(admin.ModelAdmin):
  search_fields = ['name']

admin.site.register(Pokemon, PokemonAdmin)
admin.site.register(Ability, AbilityAdmin)
admin.site.register(Type, TypeAdmin)