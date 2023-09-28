<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class FilmsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('films')->insert([
                'name' => $faker->sentence(3),
                'description' => $faker->paragraph,
                'release_date' => $faker->date,
                'ticket_price' => $faker->randomFloat(2, 5, 50),
                'country' => $faker->country,
                'genre' => $faker->word,
                'photo' => $faker->imageUrl(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
