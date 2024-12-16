<?php
require_once __DIR__ . '/../api/db.php';
require_once __DIR__ . '/Card.php';

class CardData
{
    public string $file = __DIR__ . '/../data/data.json';

    /** @return Card[] */
    public function getAll(): array
    {
        $pdo = getConnection();

        $state = $pdo->prepare('SELECT * FROM jobs');
        $state->execute();

        $cards = [];

        foreach ($state as $row) {
            $card = new Card(
                $row['id'],
                $row['companyname'],
                $row['jobtypedetail'],
                $row['businessdetail'],
                $row['salary_y_min'],
                $row['salary_y_max'],
                $row['workingtype'],
                $row['workingplace'],
                $row['workingtime'],
                $row['created_at']
            );
            $cards[] = $card;
        }
        return $cards;
    }

    public function getById(int $id): ?Card
    {
        $cards = $this->getAll();
        return $cards[$id] ?? null;
    }

    public function getMaxId(): int
    {
        $cards = $this->getAll();
        return max(array_map(fn($card) => $card->id, $cards));
    }
}
