from django.core.management.base import BaseCommand
from extractor.populate import PokemonsAbilityType


class Command(BaseCommand):
    help = 'Populate Pokemons Abilities and Types'

    def handle(self, *args, **kwargs):
        result = PokemonsAbilityType()