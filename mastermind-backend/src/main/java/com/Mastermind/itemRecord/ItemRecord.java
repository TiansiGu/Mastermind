package com.Mastermind.itemRecord;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

/**
 * Persistent Class ItemRecord entity in the DB has 4 properties: category,item,price,stock
 */
@Entity(name = "ItemRecord")
public class ItemRecord {

    @Id
    Long id;
    String category;
    String item;
    int price;
    int stock;

    // Constructor
    public ItemRecord(String category, String item, int price, int stock) {
        this.category = category;
        this.item = item;
        this.price = price;
        this.stock = stock;
    }

    // Getter and Setter Methods for each data members
    public long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getItem() {
        return this.item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public int getPrice() {
        return this.price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStock() {
        return this.stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    /**
     * Override of toString method
     * @return a string that shows id, category, item, price, and stock
     */
    @Override
    public String toString() {
        return "{" +
                "id:" + this.id +
                ", category:'" + this.category + '\'' +
                ", item:" + this.item +
                ", price:" + this.price +
                ", stock:" + this.stock +
                '}';
    }
}