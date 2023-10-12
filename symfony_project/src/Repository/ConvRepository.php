<?php

namespace App\Repository;

use App\Entity\Conv;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Conv>
 *
 * @method Conv|null find($id, $lockMode = null, $lockVersion = null)
 * @method Conv|null findOneBy(array $criteria, array $orderBy = null)
 * @method Conv[]    findAll()
 * @method Conv[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConvRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Conv::class);
    }

    public function save(Conv $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @throws Exception
     */
    public function getAllConvByUser($userId): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT * FROM conv
            WHERE id IN(
            SELECT conv_id_id FROM conv_user WHERE user_id_id = :userId)
            ORDER BY updated_at DESC
        ';

        $resultSet = $conn->executeQuery($sql, ['userId' => $userId]);

        return $resultSet->fetchAllAssociative();
    }

//    /**
//     * @return Conv[] Returns an array of Conv objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Conv
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
