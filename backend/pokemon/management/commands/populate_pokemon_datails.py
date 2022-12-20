from extractor.populate import PokemonsDetails

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populate Pokemons Details"

    def handle(self, *args, **kwargs):
        PokemonsDetails()
