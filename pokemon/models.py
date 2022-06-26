from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.
class Pokemon(models.Model):
    name = models.CharField(_("Name"), max_length=50)

    class Meta:
        verbose_name = _("Pokemon")
        verbose_name_plural = _("Pokemons")

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
    
    def detail_to_dict(self):
        abilities = Ability.objects.filter(pokemon__id=self.id)
        typies = Type.objects.filter(pokemon__id=self.id)
        return {
            'id': self.id,
            'name': self.name,
            'abilities': [ability.to_dict() for ability in abilities],
            'typies': [type.to_dict() for type in typies]
        }


class Ability(models.Model):
    pokemon = models.ForeignKey("pokemon.Pokemon", verbose_name=_("Pokemon"), on_delete=models.CASCADE)
    name = models.CharField(_("Ability"), max_length=50)

    class Meta:
        verbose_name = _("Ability")
        verbose_name_plural = _("Abilitys")

    def __str__(self):
        return self.name
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Type(models.Model):
    pokemon = models.ManyToManyField("pokemon.Pokemon", verbose_name=_("Pokemon"))
    name = models.CharField(_("Type"), max_length=50)

    class Meta:
        verbose_name = _("Type")
        verbose_name_plural = _("Types")

    def __str__(self):
        return self.name
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


