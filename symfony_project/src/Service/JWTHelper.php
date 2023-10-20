<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper
{
    private string $mercureSecret;

    public function __construct(string $mercureSecret)
    {
        $this->mercureSecret = $mercureSecret;
    }

    public function createJWT(User $user): string
    {
        $payload = [
            "mercure" => [
                "subscribe" => ["https://example.com/user/{$user->getId()}/{?topic}"],
                "payload" => [
                    "username" => $user->getUsername(),
                    "userid" => $user->getId(),
                ]
            ],
            "exp" => (new \DateTime("+ 20 minutes"))->getTimestamp()
        ];

        return JWT::encode($payload, $this->mercureSecret, 'HS256');
    }

    public function isJwtValid(string $jwt): ?object
    {
        try {
            return JWT::decode($jwt, new Key($this->mercureSecret, 'HS256'));
        } catch (\Exception $e) {
            return null;
        }
    }
}
