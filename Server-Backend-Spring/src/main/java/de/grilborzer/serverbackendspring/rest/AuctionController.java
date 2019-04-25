package de.grilborzer.serverbackendspring.rest;

import de.grilborzer.serverbackendspring.persistence.AuctionItem;
import de.grilborzer.serverbackendspring.persistence.AuctionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class AuctionController {

    private final AuctionRepository auctionRepository;

    public AuctionController(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    @PostMapping("/update-item")
    public boolean updateAuctionItem(@RequestBody AuctionItem auctionItem) {
        auctionRepository.save(auctionItem);
        return true;
    }

    @GetMapping("/all-items")
    public List<AuctionItem> getInitialAuctionItems() {
        return auctionRepository.findAll();
    }
}
