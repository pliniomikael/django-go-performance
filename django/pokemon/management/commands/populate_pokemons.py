from extractor.populate import BasePokemons

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populate Pokemons"

    def handle(self, *args, **kwargs):
        BasePokemons()
