<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231006130754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE conv (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', admin VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE conv_user (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, conv_id_id INT NOT NULL, INDEX IDX_9A4A93F39D86650F (user_id_id), INDEX IDX_9A4A93F354E71D80 (conv_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, conv_id_id INT NOT NULL, content VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, INDEX IDX_B6BD307F9D86650F (user_id_id), INDEX IDX_B6BD307F54E71D80 (conv_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE conv_user ADD CONSTRAINT FK_9A4A93F39D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE conv_user ADD CONSTRAINT FK_9A4A93F354E71D80 FOREIGN KEY (conv_id_id) REFERENCES conv (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F54E71D80 FOREIGN KEY (conv_id_id) REFERENCES conv (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE conv_user DROP FOREIGN KEY FK_9A4A93F39D86650F');
        $this->addSql('ALTER TABLE conv_user DROP FOREIGN KEY FK_9A4A93F354E71D80');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F9D86650F');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F54E71D80');
        $this->addSql('DROP TABLE conv');
        $this->addSql('DROP TABLE conv_user');
        $this->addSql('DROP TABLE message');
    }
}
