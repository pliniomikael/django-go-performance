from pokemon.views import (
    pokemon_golang,
    pokemon_orm,
    pokemon_sql,
    pokemons_golang,
    pokemons_orm,
    pokemons_sql,
)

from django.urls import include, path

urlpatterns = [
    path(
        "orm/",
        include(
            [
                path("pokemons/", pokemons_orm, name="pokemons_orm"),
                path("pokemon/<str:pokemon_name>/", pokemon_orm, name="pokemon_orm"),
            ]
        ),
    ),
    path(
        "sql/",
        include(
            [
                path("pokemons/", pokemons_sql, name="pokemons_sql"),
                path("pokemon/<str:pokemon_name>/", pokemon_sql, name="pokemon_sql"),
            ]
        ),
    ),
    path(
        "golang/",
        include(
            [
                path("pokemons/", pokemons_golang, name="pokemons_golang"),
                path(
                    "pokemon/<str:pokemon_name>/", pokemon_golang, name="pokemon_golang"
                ),
            ]
        ),
    ),
]
