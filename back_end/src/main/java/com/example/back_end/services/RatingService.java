package com.example.back_end.services;

import com.example.back_end.models.entities.Product;
import com.example.back_end.models.entities.Rating;
import com.example.back_end.models.entities.User;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.repos.RatingRepository;
import com.example.back_end.repos.UserRepository;
import com.example.back_end.services.imp.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    public Rating createRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public Rating getRatingById(Integer id) {
        Optional<Rating> rating = ratingRepository.findById(id);
        return rating.orElse(null);
    }

    public Rating updateRating(Integer id, Rating rating) {
        Optional<Rating> existingRating = ratingRepository.findById(id);
        if (existingRating.isPresent()) {
            Rating updatedRating = existingRating.get();
            updatedRating.setStar(rating.getStar());
            updatedRating.setComment(rating.getComment());
            updatedRating.setCreate_at(rating.getCreate_at());
            return ratingRepository.save(updatedRating);
        }
        return null;
    }

    public void deleteRating(Integer id) {
        ratingRepository.deleteById(id);
    }

    public Rating createRatingForProduct(Integer productId, Rating rating, String email) {
        Optional<Product> productOptional = productRepository.findById(Long.valueOf(productId));

        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            // Lấy thông tin người dùng từ userRepository hoặc thông qua idUser

            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                rating.setProduct(product);
                rating.setUser(user);

                return ratingRepository.save(rating);
            } else {
                throw new IllegalArgumentException("User with id " + email + " not found");
            }
        } else {
            throw new IllegalArgumentException("Product with id " + productId + " not found");
        }
    }


    public List<Rating> getRatingsByProductId(Integer productId) {
        return ratingRepository.findByProductId(productId);
    }
}
