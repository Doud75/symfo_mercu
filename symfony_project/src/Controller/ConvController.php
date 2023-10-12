<?php

namespace App\Controller;

use App\Entity\Conv;
use App\Entity\ConvUser;
use App\Repository\ConvRepository;
use App\Repository\ConvUserRepository;
use App\Repository\UserRepository;
use App\Service\JWTHelper;
use Doctrine\DBAL\Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ConvController extends AbstractController
{
    /**
     * @throws Exception
     */
    #[Route('/conv', name: 'getConv', methods: 'GET')]
    public function getConv(
        JWTHelper $jwt,
        string $mercureSecret,
        ConvRepository $convRepository
    )
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

        $userId = $token->mercure->payload->userid;

        $conv = $convRepository->getAllConvByUser($userId);

        return $this->json([
            "conv" => $conv
        ]);
    }

    #[Route('/conv', name: 'newConv', methods: 'POST')]
    public function newConv(
        Request $request,
        JWTHelper $jwt,
        string $mercureSecret,
        UserRepository $userRepository,
        ConvRepository $convRepository,
        ConvUserRepository $convUserRepository
    )
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
        $name = $_POST['name'];

        $conv = $convRepository->findBy(['name' => $name]);
        if (count($conv) > 0) {
            return $this->json([
                "message" => "name already exist"
            ]);
        }

        $conv = (new Conv())->setName($name)->setAdmin($userName)->setUpdatedAt(new \DateTimeImmutable());
        $convRepository->save($conv, true);

        $convUser = (new ConvUser())->setUserId($user)->setConvId($conv);
        $convUserRepository->save($convUser, true);

        $secondUserName = $_POST['convUserName'];
        $secondUser = $userRepository->findBy(['username' => $secondUserName])[0];

        $secondConvUser = (new ConvUser())->setUserId($secondUser)->setConvId($conv);
        $convUserRepository->save($secondConvUser, true);

        return $this->json([
            "conv" => $conv
        ]);
    }
}
