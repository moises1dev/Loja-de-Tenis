<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "products")]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "string", length: 100)]
    private string $brand;

    #[ORM\Column(type: "string", length: 50)]
    private string $gender;

    // coluna "size" no banco
    #[ORM\Column(name: "size", type: "string", length: 50)]
    private string $size;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: "decimal", precision: 10, scale: 2)]
    private float $price;

    #[ORM\Column(type: "integer")]
    private int $stock;

    #[ORM\Column(type: "string", length: 255)]
    private string $image_url;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private ?\DateTimeImmutable $created_at = null;

    // ========= GETTERS / SETTERS =========

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getBrand(): string
    {
        return $this->brand;
    }
    public function setBrand(string $brand): self
    {
        $this->brand = $brand;
        return $this;
    }

    public function getGender(): string
    {
        return $this->gender;
    }
    public function setGender(string $gender): self
    {
        $this->gender = $gender;
        return $this;
    }

    public function getSize(): string
    {
        return $this->size;
    }
    public function setSize(string $size): self
    {
        $this->size = $size;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }
    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getStock(): int
    {
        return $this->stock;
    }
    public function setStock(int $stock): self
    {
        $this->stock = $stock;
        return $this;
    }

    public function getImageUrl(): string
    {
        return $this->image_url;
    }
    public function setImageUrl(string $imageUrl): self
    {
        $this->image_url = $imageUrl;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }
    public function setCreatedAt(?\DateTimeImmutable $createdAt): self
    {
        $this->created_at = $createdAt;
        return $this;
    }
}
