from django.core.management.base import BaseCommand
from extractor.populate import PokemonsImagesNone


class Command(BaseCommand):
    help = 'Populate Pokemons Details'

    def handle(self, *args, **kwargs):
        result = PokemonsImagesNone()
