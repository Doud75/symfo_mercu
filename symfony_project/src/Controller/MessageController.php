<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\ConvRepository;
use App\Repository\ConvUserRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use App\Service\JWTHelper;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    #[Route('/message', name: 'newMessage', methods: 'POST')]
    public function newMessage(
        Request $request,
        JWTHelper $jwt,
        string $mercureSecret,
        UserRepository $userRepository,
        MessageRepository $messageRepository,
        ConvRepository $convRepository,
        HubInterface $hub,
        ConvUserRepository $convUserRepository
    ): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $authorisationHeader = getallheaders()['Authorization'] ?? getallheaders()['authorization'];
        $cred = str_replace("Bearer ", "", $authorisationHeader);
        $token = $jwt->isJwtValid($cred);
        if (!$token) {
            return $this->json([
                "message" => "invalid cred"
            ]);
        }

        $token = JWT::decode($cred, new Key($mercureSecret, 'HS256'));
        $userName = $token->mercure->payload->username;
        $user = $userRepository->findBy(['username' => $userName])[0];
        $conv = $convRepository->find($_POST['convId']);

        $message = (new Message())
            ->setUserId($user)
            ->setAuthor($userName)
            ->setContent($_POST['content'])
            ->setConvId($conv)
            ->setUpdatedAt(new \DateTimeImmutable());

        $messageRepository->save($message, true);

        $userList = $convUserRepository->findBy(['conv_id' => $conv]);

        try {
            foreach ($userList as $eachUser) {
                $update = new Update(
                    [
                        "https://example.com/my-private-topic",
                        "https://example.com/user/{$eachUser->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
                    ],
                    json_encode([
                        'user' => $user->getUsername(),
                        'id' => $user->getId()
                    ]),
                    true
                );

                $hub->publish($update);
            }

            return $this->json([
                "message" => $message
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'error' => $e
            ]);
        }
    }

    #[Route('/message/{convId}', name: 'getMessage', methods: 'GET')]
    public function getMessage(
        UserRepository $userRepository,
        MessageRepository $messageRepository,
        ConvRepository $convRepository,
        JWTHelper $jwt,
        string $mercureSecret,
        int $convId,
    )
    {
        /*$authorisationHeader = getallheaders()['Authorization'] ?? getallheaders()['authorization'];
        $cred = str_replace("Bearer ", "", $authorisationHeader);
        $token = $jwt->isJwtValid($cred);
        if (!$token) {
            return $this->json([
                "message" => "invalid cred"
            ]);
        }

        $token = JWT::decode($cred, new Key($mercureSecret, 'HS256'));
        $userName = $token->mercure->payload->username;
        $user = $userRepository->findBy(['username' => $userName])[0];*/
        $conv = $convRepository->find($convId);

        $message = $messageRepository->findBy(['conv_id' => $conv],['updated_at' => 'DESC']);

        return $this->json([
            "message" => $message
        ]);
    }

}
