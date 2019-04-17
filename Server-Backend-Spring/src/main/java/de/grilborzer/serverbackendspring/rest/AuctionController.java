package de.grilborzer.serverbackendspring.rest;

import de.grilborzer.serverbackendspring.persistence.AuctionItem;
import de.grilborzer.serverbackendspring.persistence.AuctionRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class AuctionController {

    private final AuctionRepository auctionRepository;

    public AuctionController(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    @GetMapping("/all-items")
    public List<AuctionItem> getInitialAuctionItems() {
        return auctionRepository.findAll();
    }
}
