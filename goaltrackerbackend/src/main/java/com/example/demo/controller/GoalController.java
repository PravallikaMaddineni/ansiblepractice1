package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Goal;
import com.example.demo.service.GoalService;

@RestController
@RequestMapping("/goal")
@CrossOrigin("*")
public class GoalController {

    @Autowired
    private GoalService service;

    @GetMapping("/")
    public String home() {
        return "Goal Home Page";
    }

    @PostMapping("/addgoal")
    public ResponseEntity<String> addGoal(@RequestBody Goal goal) {
        try {
            String output = service.addGoal(goal);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add goal!");
        }
    }

    @GetMapping("/viewall")
    public List<Goal> viewAllGoals() {
        return service.viewAllGoals();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteGoal(@PathVariable int id) {
        return service.deleteGoal(id);
    }
}
