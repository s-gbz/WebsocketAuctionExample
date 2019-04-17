package de.grilborzer.serverbackendspring.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<AuctionItem, Long> {
}
