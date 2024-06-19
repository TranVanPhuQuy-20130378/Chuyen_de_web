package com.example.back_end.controller;

import com.example.back_end.common.StatusProduct;
import com.example.back_end.dto.ProductDTO;
import com.example.back_end.models.ResponseObject;
import com.example.back_end.models.ResponseObject2;
import com.example.back_end.models.entities.Product;
import com.example.back_end.repos.ProductRepository;
import com.example.back_end.services.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.data.web.SortDefault.SortDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductApi {
    @Autowired
    private IProductService productService;

	@GetMapping("/{id}")
	public ResponseEntity<ResponseObject> findProductById(@PathVariable(name = "id") long id) {
		return Optional
				.of(ResponseEntity.ok()
						.body(new ResponseObject(HttpStatus.OK.name(), HttpStatus.OK.getReasonPhrase(),
								productService.findById(id))))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(), "")));
	}
	@PatchMapping("/{id}")
	public ResponseEntity<ResponseObject> updateProductById(@PathVariable(name = "id") long id, @RequestBody ProductDTO productDTO) {

		ProductDTO updatedProduct = productService.updateById(id, productDTO);
		if (updatedProduct != null) {
			return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK.name(), HttpStatus.OK.getReasonPhrase(), updatedProduct));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(), ""));
		}
	}
	@GetMapping("/search")
	public ResponseEntity<ResponseObject2> findProductByName(@RequestParam(name = "name") String input,
														  @PageableDefault(size = 300, page = 0) Pageable pageable) {
		return ResponseEntity.ok()
				.body(new ResponseObject2(HttpStatus.OK.name(), HttpStatus.OK.getReasonPhrase(),productService.findByNameProduct(input).size()+"",
						productService.findByNameProduct(input, pageable)));
	}

	@GetMapping("/fitter-product-hot")
	public ResponseEntity<ResponseObject> findProductHot(@PageableDefault(size = 3, page = 0) Pageable pageable) {
		try {
			List<ProductDTO> hotProducts = productService.findByStatus(StatusProduct.HOT, pageable);
			return ResponseEntity.ok(new ResponseObject("Ok", "OK", hotProducts));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(), ""));
		}
	}


    @GetMapping("")
    public ResponseEntity<ResponseObject2> findAllProduct(
            @PageableDefault(size = 1000, page = 0) Pageable pageable) {
        return Optional.ofNullable(
                        ResponseEntity.ok()
                                .body(new ResponseObject2("Ok", "OK",productService.findAll().size()+"",
                                        productService.findAll(pageable))))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject2(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(),null, "")))
                ;
    }
	@GetMapping("/filter")
	public ResponseEntity<ResponseObject2> findByVendorName(
			@RequestParam(name = "vendor") String vendorName,
			@PageableDefault(size = 6, page = 0) Pageable pageable) {
		List<ProductDTO> products = productService.findByVendorNameContaining(vendorName, pageable);

		return Optional.ofNullable(
						ResponseEntity.ok()
								.body(new ResponseObject2("Ok", "OK",productService.findByVendorNameContaining(vendorName).size()+"", products)))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject2(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(),null, "")));
	}

//	@GetMapping("/filter")
	public ResponseEntity<ResponseObject> findByTypeProduct_IdOrCate_Id(
			@RequestParam(name = "vendor", required = false) Integer idVenor,
			@RequestParam(name = "cate", required = false) Long idCate,
			@PageableDefault(size = 6, page = 0) @SortDefaults({
					@SortDefault(sort = "listedPrice", direction = Sort.Direction.DESC)}) Pageable pageable) {
		List<ProductDTO> products;

		switch (countNonNullParams(idVenor, idCate)) {
			case 1:
				products = handleSingleParam(idVenor, idCate, pageable);
				break;
			case 2:
				products = handleTwoParams(idVenor, idCate, pageable);
				break;
			case 3:
				products = handleThreeParams(idVenor, idCate, pageable);
				break;
			default:
				// Handle other cases if needed
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
						new ResponseObject(HttpStatus.BAD_REQUEST.name(), "Invalid number of parameters", ""));
		}

		return Optional.ofNullable(
						ResponseEntity.ok()
								.body(new ResponseObject("Ok", "OK", products)))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject(HttpStatus.NOT_FOUND.name(), HttpStatus.NOT_FOUND.getReasonPhrase(), "")))
				;
	}

	private int countNonNullParams(Object... params) {
		return (int) Arrays.stream(params).filter(Objects::nonNull).count();
	}

	private List<ProductDTO> handleSingleParam(Integer idVendor, Long idCate, Pageable pageable) {
		return productService.findByTypeProduct_IdOrCate_Id(idVendor, idCate, pageable);
	}

	private List<ProductDTO> handleTwoParams(Integer idVendor, Long idCate, Pageable pageable) {
		if(idVendor == null){
			return productService.findByCate_Id(idCate, pageable);
		} else if (idCate == null) {
			return productService.findByTypeProduct_Id(idVendor, pageable);
		} else {
			return productService.findByTypeProduct_IdAndCate_Id(idVendor, idCate, pageable);
		}
	}

	private List<ProductDTO> handleThreeParams(Integer idVendor, Long idCate, Pageable pageable) {
		return productService.findByTypeProduct_IdAndCate_Id(idVendor,idCate,pageable);
	}

	@GetMapping("/by-vendor/{vendorId}")
	public List<ProductDTO> getProductsByVendor(@PathVariable Integer vendorId) {
		return productService.getProductsByVendor(vendorId);
	}
}