from extractor.populate import PokemonsImagesNone

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populate Pokemons Details"

    def handle(self, *args, **kwargs):
        PokemonsImagesNone()
