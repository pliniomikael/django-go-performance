from django.core.management.base import BaseCommand
from extractor.populate import BasePokemons


class Command(BaseCommand):
    help = 'Populate Pokemons'

    def handle(self, *args, **kwargs):
        result = BasePokemons()