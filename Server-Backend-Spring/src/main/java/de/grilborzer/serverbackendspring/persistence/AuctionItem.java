package de.grilborzer.serverbackendspring.persistence;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AuctionItem {

    @Id
    @GeneratedValue
    private long id;
    private int currentBid;
    private int topBid;
    private int newBid;
    private String name;
    private String description;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCurrentBid() {
        return currentBid;
    }

    public void setCurrentBid(int currentBid) {
        this.currentBid = currentBid;
    }

    public int getTopBid() {
        return topBid;
    }

    public void setTopBid(int topBid) {
        this.topBid = topBid;
    }

    public int getNewBid() {
        return newBid;
    }

    public void setNewBid(int newBid) {
        this.newBid = newBid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
