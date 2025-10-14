package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "goal_table")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gid")
    private int id;

    @Column(name = "gtitle", length = 100, nullable = false)
    private String title;

    @Column(name = "gdescription", length = 255)
    private String description;

    @Column(name = "gstatus", length = 20, nullable = false)
    private String status; // like "Pending", "In Progress", "Completed"

    // Constructors
    public Goal() {
    }

    public Goal(String title, String description, String status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Goal [id=" + id + ", title=" + title + ", description=" + description + ", status=" + status + "]";
    }
}
